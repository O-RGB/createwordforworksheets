import { BgCal, colorPrimary } from "@/config/color";

export const scrollToEleemtById = (
  id: string,
  color: string = "bg-green-400" || "bg-red-400",
  padding: string = "p-2",
  textColor: string = "text-white"
) => {
  var my_element: HTMLElement | null = document.getElementById(id);
  if (my_element) {
    my_element.className = `rounded-xl duration-300 ${textColor} ${padding}`;
    my_element.style.backgroundColor = colorPrimary;
    setTimeout(() => {
      if (my_element) {
        my_element.className = "duration-300";
        my_element.style.backgroundColor = "";
      }
    }, 2000);
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }
};
