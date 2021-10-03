const func = (...arg) => {
  if (arg.indexOf("a") > -1) {
    console.log(true);
  }
};

func("a", "B");
