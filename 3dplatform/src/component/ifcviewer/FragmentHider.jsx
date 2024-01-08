import { useContext } from "react";
import * as OBC from "openbim-components";
import { ViewerContext } from "../Context";
import * as dat from "three/examples/jsm/libs/lil-gui.module.min";

const FragmentHider = () => {
  const { viewer, model } = useContext(ViewerContext);

  const fragmentHider = async () => {
    const hider = new OBC.FragmentHider(viewer);
    await hider.loadCached();

    const classifier = new OBC.FragmentClassifier(viewer);
    classifier.byStorey(model);
    classifier.byEntity(model);
    const classifications = classifier.get();

    const storeys = {};
    const storeyNames = Object.keys(classifications.storeys);
    for (const name of storeyNames) {
      storeys[name] = true;
    }

    const classes = {};
    const classNames = Object.keys(classifications.entities);
    for (const name of classNames) {
      classes[name] = true;
    }

    const gui = new dat.GUI();
    const storeysGui = gui.addFolder("Storeys");
    for (const name in storeys) {
      storeysGui.add(storeys, name).onChange(async (visible) => {
        const found = await classifier.find({ storeys: [name] });
        hider.set(visible, found);
      });
    }

    const entitiesGui = gui.addFolder("Classes");
    for (const name in classes) {
      entitiesGui.add(classes, name).onChange(async (visible) => {
        const found = await classifier.find({ entities: [name] });
        hider.set(visible, found);
      });
    }

    // const toolbar = new OBC.Toolbar(viewer);
    // viewer.ui.addToolbar(toolbar);
    // const hiderButton = hider.uiElement.get("main");
    // toolbar.addChild(hiderButton);
  };

  return (
    <button className="flex ml-2 mr-2 mt-2 gap-2" onClick={fragmentHider}>
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
          d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
        />
      </svg>
      Hider
    </button>
  );
};

export default FragmentHider;
