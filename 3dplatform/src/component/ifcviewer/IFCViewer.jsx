import { useContext, useEffect } from "react";
import * as OBC from "openbim-components";
import * as THREE from "three";
import { FragmentsGroup } from "bim-fragment";
import { ViewerContext } from "../Context";

const IFCViewer = () => {
  const {
    setViewer,
    updateModel,
    updateViewerContainer,
    updateIfcLoader,
    updatehighliter,
  } = useContext(ViewerContext);

  const configViewer = () => {
    const viewer = new OBC.Components();
    setViewer(viewer);

    const viewerContainer = document.getElementById("viewer-container");
    updateViewerContainer(viewerContainer);

    viewer.scene = new OBC.SimpleScene(viewer);
    viewer.scene.setup();

    const renderer = new OBC.PostproductionRenderer(viewer, viewerContainer);
    viewer.renderer = renderer;

    viewer.camera = new OBC.SimpleCamera(viewer);
    viewer.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);
    const raycasterComponent = new OBC.SimpleRaycaster(viewer);
    viewer.raycaster = raycasterComponent;

    viewer.init();

    const { postproduction } = renderer;
    postproduction.enabled = true;

    const fragmentManager = new OBC.FragmentManager(viewer);

    const fragmentExports = (model) => {
      if (!(model instanceof FragmentsGroup)) {
        console.error("Model is not an instance Fragments");
        return;
      }

      const fragmentBinary = fragmentManager.export(model);
      const blob = new Blob([fragmentBinary]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${model.name}.frag`;
      a.click();
      URL.revokeObjectURL(url);
    };

    const IfcLoader = new OBC.FragmentIfcLoader(viewer);
    updateIfcLoader(IfcLoader);
    viewer.renderer.postproduction.enabled = true;

    const grid = new OBC.SimpleGrid(viewer, new THREE.Color(0x666666));
    viewer.tools.add("grid", grid);
    const customEffects = viewer.renderer.postproduction.customEffects;
    customEffects.excludedMeshes.push(grid.get());

    const highlighter = new OBC.FragmentHighlighter(viewer);
    highlighter.setup();
    updatehighliter(highlighter);

    const propertiesProcessoor = new OBC.IfcPropertiesProcessor(viewer);
    highlighter.events.select.onClear.add(() => {
      propertiesProcessoor.cleanPropertiesList();
    });

    const classifier = new OBC.FragmentClassifier(viewer);
    // const classificationWindow = new OBC.FloatingWindow(viewer)
    // classificationWindow.visible=false
    // viewer.ui.add(classificationWindow)
    // classificationWindow.title= "Modelos Groups"

    // const clasisificationsBtn = new OBC.Button(viewer)
    // clasisificationsBtn.materialIcon = "account_tree"

    const onModelLoaded = async (model) => {
      if (!(model instanceof FragmentsGroup)) {
        console.error("no fragment");
        return;
      }
      highlighter.update();
      classifier.byStorey(model);
      classifier.byEntity(model);

      propertiesProcessoor.process(model);
      propertiesProcessoor.renderProperties(model);
      highlighter.events.select.onHighlight.add((fragmentMap) => {
        const expressID = [...Object.values(fragmentMap)[0]][0];
        propertiesProcessoor.renderProperties(model, Number(expressID));
        updateModel(model); // lleve model al context
      });
    };

    IfcLoader.onIfcLoaded.add(async (model) => {
      fragmentExports(model);
      onModelLoaded(model);
      updateModel(model); // lleva model al context
    });

    fragmentManager.onFragmentsLoaded.add((model) => {
      onModelLoaded(model);
    });

    const importFragmentBtn = new OBC.Button(viewer);
    importFragmentBtn.materialIcon = "upload";
    importFragmentBtn.tooltip = "Load FRAG";

    importFragmentBtn.onClick.add(() => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "frag";
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        const binary = reader.result;
        if (binary instanceof ArrayBuffer) {
          return;
        }
        const fragmentBinary = new Uint8Array(binary);
        await fragmentManager.load(fragmentBinary);
      });
      input.addEventListener("change", () => {
        const fileslist = input.files;
        if (!fileslist) {
          return;
        }
        reader.readAsArrayBuffer(fileslist[0]);
      });
      input.click();
    });

    const Toolbar = new OBC.Toolbar(viewer);
    viewer.ui.addToolbar(Toolbar);
    Toolbar.addChild(IfcLoader.uiElement.get("main"), importFragmentBtn);
  };

  useEffect(() => {
    configViewer();
    const viewer = new OBC.Components();
    return () => {
      viewer.dispose();
      setViewer(null);
    };
  }, []);

  return <div id="viewer-container" className="min-h-screen min-w-full "></div>;
};
export default IFCViewer;
