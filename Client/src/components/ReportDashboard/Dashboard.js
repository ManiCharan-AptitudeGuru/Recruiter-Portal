import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  DashboardContainer,
  WidgetContainer,
  GridTitle,
  RecruitmentStats,
  StatItem,
  StatLabel,
  StatValue,
  ProgressBarContainer,
  FormButton,
  ChartContainer,
  ExportButtonContainer,
  ExportButton,
  Notification,
  EditableHeadingContainer,
  HeadingInput,
  SaveButton,
  EditIcon,
} from "./StyledComponents";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  data,
  pieData,
  pieOptions,
  layout,
  cols,
  breakpoints,
  exportPDF,
  exportExcel,
  exportCSV,
  shareViaEmail,
} from "../../data/functionsData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ResponsiveGridLayout = WidthProvider(Responsive);

const EditableHeading = ({ heading, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHeading, setEditedHeading] = useState(heading);

  const handleSave = () => {
    onSave(editedHeading);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditableHeadingContainer>
        <HeadingInput
          type="text"
          value={editedHeading}
          onChange={(e) => setEditedHeading(e.target.value)}
        />
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </EditableHeadingContainer>
    );
  }

  return (
    <EditableHeadingContainer>
      <h3
        style={{
          fontSize: "16px",
          padding: "10px",
          marginTop: "15px",
          paddingRight: "0px",
        }}
      >
        {heading}
      </h3>
      <EditIcon onClick={() => setIsEditing(true)} />
    </EditableHeadingContainer>
  );
};

const ReportDashboard = () => {
  const navigate = useNavigate();

  const [headings, setHeadings] = useState(() => {
    const savedHeadings = localStorage.getItem("dashboardHeadings");
    return savedHeadings
      ? JSON.parse(savedHeadings)
      : {
          a: "Recruitment Analysis",
          b: "Custom Reports",
          c: "Recruitment Trends",
          d: "Department-wise Hiring",
          e: "Monthly Recruitment Summary",
          f: "Export and Share Reports",
        };
  });

  const [mouseDownPos, setMouseDownPos] = useState(null);
  const buttonRef = useRef(null);
  const [actionToPerform, setActionToPerform] = useState(() => {});
  const [showNotification, setShowNotification] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const longPressTimer = useRef(null);
  const draggedWidget = useRef(null);

  useEffect(() => {
    const touchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
    setIsTouch(touchDevice);
    setIsDraggable(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardHeadings", JSON.stringify(headings));
  }, [headings]);

  const handleHeadingChange = (key, newHeading) => {
    setHeadings((prevHeadings) => ({
      ...prevHeadings,
      [key]: newHeading,
    }));
  };

  const copyLinkToClipboard = async () => {
    const link = window.location.href;
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      try {
        await navigator.clipboard.writeText(link);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 6000);
      } catch (err) {
        console.error("Failed to copy: ", err);
        alert(
          "Unable to copy link automatically. Please copy it manually: " + link
        );
      }
    } else {
      console.warn("Clipboard API not available");
      alert(
        "Unable to copy link automatically. Please copy it manually: " + link
      );
    }
  };

  const handleMouseDown = (e) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e) => {
    if (mouseDownPos) {
      const dx = Math.abs(e.clientX - mouseDownPos.x);
      const dy = Math.abs(e.clientY - mouseDownPos.y);

      if (dx < 5 && dy < 5) {
        navigate("/reports/custom-form");
      }
    }
    setMouseDownPos(null);
  };

  const handleTouchStart = (e, widgetKey) => {
    if (isTouch) {
      e.preventDefault();
      setMouseDownPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      longPressTimer.current = setTimeout(() => {
        setIsDraggable(true);
        draggedWidget.current = widgetKey;
      }, 4000);
    }
  };

  const handleTouchMove = (e) => {
    if (isTouch) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
      if (!isDraggable) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (isTouch) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
      if (mouseDownPos && !isDraggable) {
        const dx = Math.abs(e.changedTouches[0].clientX - mouseDownPos.x);
        const dy = Math.abs(e.changedTouches[0].clientY - mouseDownPos.y);

        if (dx < 5 && dy < 5) {
          navigate("/custom-form");
          if (actionToPerform) {
            actionToPerform();
          }
        }
      }
      setMouseDownPos(null);
      setActionToPerform(() => {});
      setIsDraggable(false);
      draggedWidget.current = null;
    }
  };

  const handlesMouseDown = (e, action) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
    setActionToPerform(() => action);
  };

  const handlesMouseUp = (e) => {
    if (mouseDownPos) {
      const dx = Math.abs(e.clientX - mouseDownPos.x);
      const dy = Math.abs(e.clientY - mouseDownPos.y);

      if (dx < 5 && dy < 5) {
        if (actionToPerform) {
          actionToPerform();
        }
      }
    }
    setMouseDownPos(null);
    setActionToPerform(() => {});
  };

  const handleExportButtonTouchStart = (e, action) => {
    e.stopPropagation();
    setActionToPerform(() => action);
  };

  const handleExportButtonTouchEnd = (e) => {
    e.stopPropagation();
    if (actionToPerform) {
      actionToPerform();
    }
    setActionToPerform(() => {});
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: headings.c,
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <DashboardContainer>
      {showNotification && (
        <Notification>Link copied to clipboard</Notification>
      )}
      <GridTitle>Dashboard</GridTitle>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={100}
        isResizable={!isTouch}
        isDraggable={isDraggable}
        isDroppable={false}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <WidgetContainer
          key="a"
          onTouchStart={(e) => handleTouchStart(e, "a")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div style={{ padding: "20px" }}>
            <EditableHeading
              heading={headings.a}
              onSave={(newHeading) => handleHeadingChange("a", newHeading)}
            />
            <RecruitmentStats>
              <StatItem>
                <ProgressBarContainer>
                  <CircularProgressbar
                    value={75}
                    text={`${75}%`}
                    styles={buildStyles({
                      pathColor: `#00e676`,
                      textColor: "#00e676",
                      trailColor: "#333",
                    })}
                  />
                </ProgressBarContainer>
                <StatLabel>Hired</StatLabel>
                <StatValue>75%</StatValue>
              </StatItem>
              <StatItem>
                <ProgressBarContainer>
                  <CircularProgressbar
                    value={15}
                    text={`${15}%`}
                    styles={buildStyles({
                      pathColor: `#ff1744`,
                      textColor: "#ff1744",
                      trailColor: "#333",
                    })}
                  />
                </ProgressBarContainer>
                <StatLabel>Rejected</StatLabel>
                <StatValue>15%</StatValue>
              </StatItem>
              <StatItem>
                <ProgressBarContainer>
                  <CircularProgressbar
                    value={10}
                    text={`${10}%`}
                    styles={buildStyles({
                      pathColor: `#ff9100`,
                      textColor: "#ff9100",
                      trailColor: "#333",
                    })}
                  />
                </ProgressBarContainer>
                <StatLabel>Pending</StatLabel>
                <StatValue>10%</StatValue>
              </StatItem>
            </RecruitmentStats>
          </div>
        </WidgetContainer>

        <WidgetContainer
          key="b"
          onTouchStart={(e) => handleTouchStart(e, "b")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div style={{ padding: "20px" }}>
            <EditableHeading
              heading={headings.b}
              onSave={(newHeading) => handleHeadingChange("b", newHeading)}
            />
            <FormButton
              ref={buttonRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={(e) => handleTouchStart(e, "b")}
              onTouchEnd={handleTouchEnd}
              onMouseLeave={() => setMouseDownPos(null)}
              onTouchCancel={() => setMouseDownPos(null)}
            >
              Fill the Form
            </FormButton>
          </div>
        </WidgetContainer>

        <WidgetContainer
          key="c"
          onTouchStart={(e) => handleTouchStart(e, "c")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ChartContainer>
            <div style={{ padding: "20px" }}>
              <EditableHeading
                heading={headings.c}
                onSave={(newHeading) => handleHeadingChange("c", newHeading)}
              />
              <Bar data={data} options={options} />
            </div>
          </ChartContainer>
        </WidgetContainer>

        <WidgetContainer
          key="d"
          onTouchStart={(e) => handleTouchStart(e, "d")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ChartContainer>
            <EditableHeading
              heading={headings.d}
              onSave={(newHeading) => handleHeadingChange("d", newHeading)}
            />
            <Pie data={pieData} options={pieOptions} />
          </ChartContainer>
        </WidgetContainer>

        <WidgetContainer
          key="e"
          onTouchStart={(e) => handleTouchStart(e, "e")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <EditableHeading
            heading={headings.e}
            onSave={(newHeading) => handleHeadingChange("e", newHeading)}
          />
          <h4 style={{ color: "#cfcfcf", margin: "10px" }}>
            No.of Candidates Hired: 120
          </h4>
          <h4 style={{ color: "#cfcfcf" }}>No.of Candidates Rejected: 100</h4>
        </WidgetContainer>

        <WidgetContainer
          key="f"
          onTouchStart={(e) => handleTouchStart(e, "f")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div style={{ padding: "20px" }}>
            <EditableHeading
              heading={headings.f}
              onSave={(newHeading) => handleHeadingChange("f", newHeading)}
            />
            <ExportButtonContainer>
              <ExportButton
                onMouseDown={(e) => handlesMouseDown(e, exportPDF)}
                onMouseUp={handlesMouseUp}
                onTouchStart={(e) => handleExportButtonTouchStart(e, exportPDF)}
                onTouchEnd={handleExportButtonTouchEnd}
                onMouseLeave={() => setActionToPerform(() => {})}
                onTouchCancel={() => setActionToPerform(() => {})}
              >
                Export PDF
              </ExportButton>
              <ExportButton
                onMouseDown={(e) => handlesMouseDown(e, exportExcel)}
                onMouseUp={handlesMouseUp}
                onTouchStart={(e) =>
                  handleExportButtonTouchStart(e, exportExcel)
                }
                onTouchEnd={handleExportButtonTouchEnd}
                onMouseLeave={() => setActionToPerform(() => {})}
                onTouchCancel={() => setActionToPerform(() => {})}
              >
                Export Excel
              </ExportButton>
              <ExportButton
                onMouseDown={(e) => handlesMouseDown(e, exportCSV)}
                onMouseUp={handlesMouseUp}
                onTouchStart={(e) => handleExportButtonTouchStart(e, exportCSV)}
                onTouchEnd={handleExportButtonTouchEnd}
                onMouseLeave={() => setActionToPerform(() => {})}
                onTouchCancel={() => setActionToPerform(() => {})}
              >
                Export CSV
              </ExportButton>
              <ExportButton
                onMouseDown={(e) => handlesMouseDown(e, shareViaEmail)}
                onMouseUp={handlesMouseUp}
                onTouchStart={(e) =>
                  handleExportButtonTouchStart(e, shareViaEmail)
                }
                onTouchEnd={handleExportButtonTouchEnd}
                onMouseLeave={() => setActionToPerform(() => {})}
                onTouchCancel={() => setActionToPerform(() => {})}
              >
                Share via Email
              </ExportButton>
              <ExportButton
                onMouseDown={(e) => handlesMouseDown(e, copyLinkToClipboard)}
                onMouseUp={handlesMouseUp}
                onTouchStart={(e) =>
                  handleExportButtonTouchStart(e, copyLinkToClipboard)
                }
                onTouchEnd={handleExportButtonTouchEnd}
                onMouseLeave={() => setActionToPerform(() => {})}
                onTouchCancel={() => setActionToPerform(() => {})}
              >
                Copy Link
              </ExportButton>
            </ExportButtonContainer>
          </div>
        </WidgetContainer>
      </ResponsiveGridLayout>
    </DashboardContainer>
  );
};

export default ReportDashboard;
