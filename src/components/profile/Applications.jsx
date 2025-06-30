"use client";

import AppAccordion from './AppAccordion';

const Applications = () => {
  const applicationsData = [
    {
      id: 1,
      type: "Təklif və İrad",
      date: "04.03.2025",
      status: "Qəbul olunub",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in neque ut leo finibus suscipit tincidunt ac dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas vitae efficitur mauris. In consequat faucibus ultrices Integer sed ligula non ex sodales pulvinar vitae eu ex.",
      isExpandedByDefault: true
    },
    {
      id: 2,
      type: "Təklif və İrad",
      date: "04.03.2025",
      status: "Qəbul olunub",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in neque ut leo finibus suscipit tincidunt ac dui. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
      isExpandedByDefault: false
    },
    {
      id: 3,
      type: "Təklif və İrad",
      date: "04.03.2025",
      status: "Qəbul olunub",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in neque ut leo finibus suscipit tincidunt ac dui.",
      isExpandedByDefault: false
    },
    {
      id: 4,
      type: "Təklif və İrad",
      date: "04.03.2025",
      status: "Qəbul olunub",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in neque ut leo finibus suscipit tincidunt ac dui. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
      isExpandedByDefault: false
    },
    {
      id: 5,
      type: "Təklif və İrad",
      date: "04.03.2025",
      status: "Qəbul olunub",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in neque ut leo finibus suscipit tincidunt ac dui.",
      isExpandedByDefault: false
    },
    {
      id: 6,
      type: "Təklif və İrad",
      date: "04.03.2025",
      status: "Qəbul olunub",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in neque ut leo finibus suscipit tincidunt ac dui. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
      isExpandedByDefault: false
    },
    {
      id: 7,
      type: "Təklif və İrad",
      date: "04.03.2025",
      status: "Qəbul olunub",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in neque ut leo finibus suscipit tincidunt ac dui.",
      isExpandedByDefault: false
    }
  ];

  return (
    <div className="p-[32px] mt-[80px] overflow-y-auto h-[calc(100vh-80px)]">
      <div className="rounded-[20px] p-[20px]">
        {applicationsData.map((application) => (
          <AppAccordion
            key={application.id}
            type={application.type}
            date={application.date}
            status={application.status}
            content={application.content}
            isExpandedByDefault={application.isExpandedByDefault}
          />
        ))}
      </div>
    </div>
  );
};

export default Applications;
