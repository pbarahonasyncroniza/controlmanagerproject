import { useContext } from "react";
import { ViewerContext } from "../Context";
import * as OBC from "openbim-components";

const IFCTree = () => {
  const { viewer, model, highlighter } = useContext(ViewerContext);

  const createModelTree = async () => {
    const classifier = new OBC.FragmentClassifier(viewer);
    const classificationWindow = new OBC.FloatingWindow(viewer);
    classificationWindow.visible = false;
    viewer.ui.add(classificationWindow);
    classificationWindow.title = "Context Tree";

    const fragmentTree = new OBC.FragmentTree(viewer);
    await fragmentTree.init();
    await fragmentTree.update(["storeys", "entities"]);
    fragmentTree.onHovered.add((fragmentMap) => {
      highlighter.highlightByID("hover", fragmentMap);
    });
    fragmentTree.onSelected.add((fragmentMap) => {
      highlighter.highlightByID("select", fragmentMap);
    });
    highlighter.update();
    classifier.byStorey(model);
    classifier.byEntity(model);
    const tree = fragmentTree.get().uiElement.get("tree");
    await classificationWindow.slots.content.dispose(true);
    classificationWindow.addChild(tree);

    return tree;
  };

  return (
    <button
      className="flex flex-grow justify-between mt-4 gap-2 ml-2 mr-10 p-2 rounded-xl bg-white text-black font-bold"
      onClick={createModelTree}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
        />
      </svg>
      Tree
    </button>
  );
};

export default IFCTree;
