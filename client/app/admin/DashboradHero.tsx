import React, { FC, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "../components/Admin/widgets/DashboardWidgets";

type Props = { isDashboard?: boolean };

const DashboradHero: FC<Props> = ({ isDashboard }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
      {isDashboard && <DashboardWidgets open={open} />}
    </div>
  );
};

export default DashboradHero;
