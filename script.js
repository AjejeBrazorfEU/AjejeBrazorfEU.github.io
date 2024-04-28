document.addEventListener("DOMContentLoaded", function () {
  const verticalNav = document.getElementById("navbar");
  const scrollContainer = document.getElementById("scroll-container");

  verticalNav.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e.target.tagName);

    if (e.target.tagName === "A") {
      const targetSectionId = e.target.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetSectionId);

      console.log(targetSectionId, targetSection);
      if (targetSection) {
        scrollContainer.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });
        console.log(targetSection.offsetTop);
      }
    }
  });
});
