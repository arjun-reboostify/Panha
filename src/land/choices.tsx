import React, { useState } from "react";

type SubTask = {
  id: number;
  text: string;
  link?: string;
};

type Task = {
  id: number;
  text: string;
  options: SubTask[]; // Updated to allow multiple buttons
};

const TaskOverlay: React.FC = () => {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      text: "Start project planning?",
      options: [
        { id: 101, text: "Research requirements", link: "/requirements" },
        { id: 102, text: "Skip to timeline planning", link: "/timeline" },
        { id: 103, text: "Notify the team", link: "/team-notify" },
        { id: 104, text: "Review goals", link: "/goals" },
        { id: 105, text: "Set up a meeting", link: "/meeting" },
      ],
    },
    {
      id: 2,
      text: "Schedule grocery shopping?",
      options: [
        { id: 201, text: "Add items to shopping list", link: "/shopping-list" },
        { id: 202, text: "Order groceries online", link: "/order-online" },
        { id: 203, text: "Check weekly deals", link: "/deals" },
        { id: 204, text: "Plan meal prep", link: "/meal-prep" },
        { id: 205, text: "Find nearby stores", link: "/stores" },
      ],
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentTask = tasks[currentIndex];

  const handleOptionClick = (link: string) => {
    window.open(link, "_blank");
  };

  const nextTask = () => {
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(progress + 1);
    }
  };

  const previousTask = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(progress - 1);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 transition-all duration-300">
      {/* Progress Indicator */}
      <div className="w-full max-w-xl mb-4">
        <div className="relative h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / tasks.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Task Card */}
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-lg font-bold mb-4">{currentTask.text}</h2>

        <div className="flex flex-col space-y-4">
          {currentTask.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.link || "#")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentIndex > 0 && (
            <button
              onClick={previousTask}
              className="text-sm text-gray-500 hover:underline"
            >
              Previous
            </button>
          )}
          {currentIndex < tasks.length - 1 && (
            <button
              onClick={nextTask}
              className="text-sm text-gray-500 hover:underline"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskOverlay;
