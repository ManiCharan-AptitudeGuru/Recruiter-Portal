import React from 'react';
import { Briefcase, UserPlus, Calendar, Star, FileText } from '@styled-icons/feather';
import { Header,WelcomeHeader, DashboardContainer, Card, CardHeader, CardTitle, IconWrapper, StyledIcon, Metric, MetricDescription } from './Dashboard.styles';
import PremiumButton from '../../global/PremiumButton/Button';


function Dashboard() {
  return (
    <>
    <Header>
      <WelcomeHeader>Hello Recruiter!</WelcomeHeader>
      <PremiumButton/>
      </Header>
      <DashboardContainer>
        <Card>
          <CardHeader>
            <IconWrapper color="#3498db">
              <StyledIcon as={Briefcase} />
            </IconWrapper>
            <CardTitle>Active Job Postings</CardTitle>
          </CardHeader>
          <Metric>12</Metric>
          <MetricDescription>2 new this week</MetricDescription>
        </Card>
        <Card>
          <CardHeader>
            <IconWrapper color="#2ecc71">
              <StyledIcon as={UserPlus} />
            </IconWrapper>
            <CardTitle>New Candidates</CardTitle>
          </CardHeader>
          <Metric>48</Metric>
          <MetricDescription>+12% from last month</MetricDescription>
        </Card>
        <Card>
          <CardHeader>
            <IconWrapper color="#e74c3c">
              <StyledIcon as={Calendar} />
            </IconWrapper>
            <CardTitle>Interviews Scheduled</CardTitle>
          </CardHeader>
          <Metric>8</Metric>
          <MetricDescription>Next interview in 2 days</MetricDescription>
        </Card>
        <Card>
          <CardHeader>
            <IconWrapper color="#7D0190">
              <StyledIcon as={FileText} />
            </IconWrapper>
            <CardTitle>Applications Received</CardTitle>
          </CardHeader>
          <Metric>3456</Metric>
          <MetricDescription>+30% increased</MetricDescription>
        </Card>
        <Card>
          <CardHeader>
            <IconWrapper color="#f39c12">
              <StyledIcon as={Star} />
            </IconWrapper>
            <CardTitle>Subscription Status</CardTitle>
          </CardHeader>
          <Metric>Premium</Metric>
          <MetricDescription>Valid until Dec 31, 2023</MetricDescription>
        </Card>
      </DashboardContainer>
    </>
  );
}

export default Dashboard;

