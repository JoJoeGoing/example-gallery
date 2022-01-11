export function addExamples(list) {
    let categoryOrder = 0;
    const exampleListByCategory = {};
    // Add by category order in each example.
    do {
      let added = false;
      for (let i = 0; i < list.length; i++) {
        const example = list[i];

        if (typeof example.category === "string") {
          example.category = [example.category];
        }

        const categoryStr = (example.category || [])[categoryOrder];
        if (categoryStr) {
          added = true;
          let categoryObj = exampleListByCategory[categoryStr];
          if (!categoryObj) {
            categoryObj = {
              category: categoryStr,
              examples: [],
            };
            exampleListByCategory[categoryStr] = categoryObj;
          }
          categoryObj.examples.push(example);
        }
      }

      if (!added) {
        break;
      }
    } while (++categoryOrder && categoryOrder < 4); // At most 4 category

    return exampleListByCategory
  }