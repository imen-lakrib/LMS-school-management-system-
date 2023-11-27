import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = ({
  data,
  isDemo,
  activeVideo,
  setActiveVideo,
}) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // find unique video sections
  const videoSections: string[] = [
    ...new Set<string>(data.map((item: any) => item.videoSection)),
  ];

  //total count of videos from previous sections
  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[15px] w-full ${
        !isDemo && "ml-[-30px] min-h-screen sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);

        // filter videos by section
        const sectionVideos: any[] = data.filter(
          (item: any) => item.videoSection === section
        );

        const sectionVideoCount: number = sectionVideos.length; //number of videos in current section
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );

        const sectionStartIndex: number = totalCount; // start index of videos within the current section
        totalCount += sectionVideoCount; // update the total count of videos

        const sectionCountentHours: number = sectionVideoLength / 60;

        return (
          <div
            className={`${!isDemo && "border-b border-[#ffffff8e] "}`}
            key={section}
          >
            <div className="w-full flex">
              {/* render video section */}
              <div className="w-full flex justify-between items-center">
                <h2 className="text-[22px] text-black dark:text-white">
                  {section}
                </h2>
                <button
                  className="mr-4 cursor-pointer  text-black dark:text-white "
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>

            <h5 className="text-black dark:text-white">
              {sectionVideoCount} Lessons .{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionCountentHours.toFixed(2)}{" "}
            </h5>
            <br />

            {isSectionVisible && (<div className="w-full">
                    {sectionVideos.map((item:any, index:number)=>{
                        
                    })}
            </div>)}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
