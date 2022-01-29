export const fadeAnim = (dur, del = 0) => {
  return {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: dur,
        delay: del,
      },
    },
  };
};
