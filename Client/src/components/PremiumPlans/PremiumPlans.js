// components/PremiumPlans.js
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getPremiumPlans, updatePlan } from "../../services/api";
import { useGlobalState } from "../../context/GlobalStateContext";
import { ThreeDots } from "react-loader-spinner";

const PlanCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.color};
  color: white;
`;

const PlanName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const PlanPeriod = styled.p`
  margin-bottom: 1rem;
`;

const PlanPrice = styled.div`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 1.5rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.included ? "white" : "rgba(255, 255, 255, 0.8)")};
`;

const FeatureIcon = styled.span`
  margin-right: 0.5rem;
  color: ${(props) => (props.included ? "#4ade80" : "#f87171")};
`;

const FeatureText = styled.span`
  color: ${(props) => (props.included ? "white" : "rgba(255, 255, 255, 0.8)")};
`;

const BuyButton = styled.button`
  margin-top: auto;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 72rem;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = React.memo(
  ({ id, name, price, features, color, onBuy, isCurrentPlan }) => {
    return (
      <PlanCardWrapper color={color}>
        <PlanName>{name}</PlanName>
        <PlanPeriod>PER MONTH</PlanPeriod>
        <PlanPrice>Rs.{price}</PlanPrice>
        <FeatureList>
          {features.map((feature, index) => (
            <FeatureItem key={feature.text + index} included={feature.included}>
              <FeatureIcon included={feature.included}>
                {feature.included ? "✓" : "✕"}
              </FeatureIcon>
              <FeatureText included={feature.included}>
                {feature.text}
              </FeatureText>
            </FeatureItem>
          ))}
        </FeatureList>
        <BuyButton onClick={() => onBuy(id)} disabled={isCurrentPlan}>
          {isCurrentPlan ? "CURRENT PLAN" : "BUY NOW"}
        </BuyButton>
      </PlanCardWrapper>
    );
  }
);

const PremiumPlans = () => {
  const { currentPlan, availablePlans, updateUserPlan, fetchUserPlans } =
    useGlobalState();
    
  
  useEffect(() => {
    fetchUserPlans();
  }, [fetchUserPlans]);

  const handleBuyPlan = async (planId) => {
    try {
      const result = await updateUserPlan(planId);
      if (result.success) {
        console.log("Plan updated successfully");
      } else {
        console.error("Failed to update the plan:", result.error);
      }
    } catch (error) {
      console.error("Failed to update the plan:", error);
    }
  };

  const getColorForPlan = React.useCallback((name) => {
    // Handle case where name might be undefined
    if (!name) return "#9ca3af"; // default color

    switch (name.toUpperCase()) {
      case "BASIC":
        return "#10b981";
      case "STANDARD":
        return "#fbbf24";
      case "PREMIUM":
        return "#f43f5e";
      default:
        return "#9ca3af";
    }
  }, []);

  if (!currentPlan || availablePlans.length === 0) {
    return (
      <PlansContainer>
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </PlansContainer>
    );
  }

  return (
    <PlansContainer>
      <PlansGrid>
      {console.log(currentPlan.name)}
        {currentPlan && (
          <PlanCard
            key={currentPlan._id}
            id={currentPlan._id}
            name={currentPlan.name || "Unknown"}
            price={currentPlan.price}
            features={currentPlan.features || []}
            color={getColorForPlan(currentPlan.name)}
            onBuy={handleBuyPlan}
            isCurrentPlan={true}
          />
        )}
        {availablePlans.map((plan) => (
          <PlanCard
            key={plan._id}
            id={plan._id}
            name={plan.name || "Unknown"}
            price={plan.price}
            features={plan.features || []}
            color={getColorForPlan(plan.name)}
            onBuy={handleBuyPlan}
            isCurrentPlan={false}
          />
        ))}
      </PlansGrid>
    </PlansContainer>
  );
};

export default React.memo(PremiumPlans);