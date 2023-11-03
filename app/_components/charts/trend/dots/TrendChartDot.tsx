import { useContext } from "react";

import ContentSidebarContext from "@/context/ContentSidebarContext";
import DataVisualizationContext from "@/context/DataVisualizationContext";
import { isPromptKey } from "@/utils/prompt";

/**
 * Handles the click event on a TrendChartDot.
 *
 * Scrolls the sidebar to the related ContentSidebarItem with the same areaKey and letter.
 */
function handleDotClick(
  letter: string | null | undefined,
  areaKey: string,
  sidebarRef: React.RefObject<HTMLDivElement> | null,
) {
  if (!letter) return;

  const contentSidebarItems = document
    .getElementById("content-sidebar")
    ?.getElementsByClassName(`content-sidebar-item-${areaKey}-${letter}`);

  if (
    contentSidebarItems &&
    contentSidebarItems.length > 0 &&
    sidebarRef?.current
  ) {
    const contentSidebarItem = contentSidebarItems[0] as HTMLDivElement;
    sidebarRef.current.scrollTo({
      behavior: "smooth",
      top: contentSidebarItem.offsetTop,
    });
  }
}

export default function TrendChartDot({
  cx,
  cy,
  dataKey,
  fill,
  index,
  isDotActive = false,
  payload,
  stroke,
}: TrendChartDotProps) {
  const { activeArea, setActiveArea } = useContext(DataVisualizationContext);
  const { sidebarRef } = useContext(ContentSidebarContext);

  const areaKey = dataKey.split(".")[0];

  if (!isPromptKey(areaKey) || !payload[areaKey]) return null;

  const { showToolTip: letter } = payload[areaKey]!;
  const fillColor = isDotActive ? fill : stroke;

  const handleClick = () => handleDotClick(letter, areaKey, sidebarRef);

  /**
   * Handles the mouse over event on an area.
   *
   * If the hovered area is not the currently active one,
   * it updates the active area to the provided areaKey.
   */
  const handleMouseOver = () => {
    if (activeArea !== areaKey) {
      setActiveArea(areaKey);
    }
  };

  return letter ? (
    <g
      key={`${index}-${dataKey}`}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <circle
        cx={cx}
        cy={cy}
        r="12"
        fill={fillColor}
        stroke={stroke}
        strokeWidth={isDotActive ? "2" : "0"}
        onMouseOver={isDotActive ? handleMouseOver : undefined}
      />
      <text
        x={cx}
        y={cy}
        dy=".3em"
        fill="#FFFFFF"
        fontSize="14px"
        fontWeight="500"
        textAnchor="middle"
      >
        {letter}
      </text>
    </g>
  ) : null;
}
