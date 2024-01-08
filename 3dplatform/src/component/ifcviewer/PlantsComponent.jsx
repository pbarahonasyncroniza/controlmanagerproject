import { useContext } from "react";
import * as OBC from "openbim-components";
import * as THREE from "three";
import { ViewerContext } from "../Context";

const PlantsComponent = () => {
  const { viewer, viewerContainer, model } = useContext(ViewerContext);

  const plansViews = async () => {
    const camera = new OBC.OrthoPerspectiveCamera(viewer);
    viewer.camera = camera;
    viewer.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);

    const renderer = new OBC.PostproductionRenderer(viewer, viewerContainer);
    viewer.renderer = renderer;
    const { postproduction } = renderer;
    postproduction.enabled = true;

    const grid = new OBC.SimpleGrid(viewer, new THREE.Color(0x666666));
    viewer.tools.add("grid", grid);
    const gridMesh = grid.get();
    postproduction._customEffects.excludedMeshes.push(gridMesh);

    const culler = new OBC.ScreenCuller(viewer);
    viewerContainer.addEventListener(
      "mouseup",
      () => (culler.needsUpdate = true)
    );
    viewerContainer.addEventListener(
      "wheel",
      () => (culler.needsUpdate = true)
    );

    const fragments = new OBC.FragmentManager(viewer);

    for (const fragment of model.items) {
      culler.add(fragment.mesh);
    }
    culler.needsUpdate = true;

    const clipper = new OBC.EdgesClipper(viewer);
    const sectionMaterial = new THREE.LineBasicMaterial({ color: "black" });
    const fillMaterial = new THREE.MeshBasicMaterial({
      color: "gray",
      side: 2,
    });
    const fillOutline = new THREE.MeshBasicMaterial({
      color: "black",
      side: 1,
      opacity: 0.5,
      transparent: true,
    });

    clipper.styles.create(
      "filled",
      new Set(),
      sectionMaterial,
      fillMaterial,
      fillOutline
    );
    clipper.styles.create("projected", new Set(), sectionMaterial);
    const styles = clipper.styles.get();

    postproduction.customEffects.outlineEnabled = true;

    const classifier = new OBC.FragmentClassifier(viewer);
    classifier.byEntity(model);
    console.log("model", model);
    classifier.byStorey(model);
    const found = classifier.find({
      entities: ["IFCWALLSTANDARDCASE", "IFCWALL"],
    });

    for (const fragid in found) {
      const { mesh } = fragments.list[fragid];
      styles.filled.fragments[fragid] = new Set(found[fragid]);
      styles.filled.meshes.add(mesh);
    }

    const meshes = [];
    for (const fragment of model.items) {
      const { mesh } = fragment;
      meshes.push(mesh);
      styles.projected.meshes.add(mesh);
    }

    const whiteColor = new THREE.Color("white");
    const whiteMaterial = new THREE.MeshBasicMaterial({ color: whiteColor });
    const materialManager = new OBC.MaterialManager(viewer);
    materialManager.addMaterial("white", whiteMaterial);
    materialManager.addMeshes("white", meshes);

    const plans = new OBC.FragmentPlans(viewer);
    await plans.computeAllPlanViews(model);

    const hider = new OBC.FragmentHider(viewer);
    const highlighter = new OBC.FragmentHighlighter(viewer);

    const highlightMat = new THREE.MeshBasicMaterial({
      depthTest: false,
      color: 0xbcf124,
      transparent: true,
      opacity: 0.3,
    });

    highlighter.add("default", highlightMat);
    const canvas = renderer.get().domElement;
    canvas.addEventListener("click", () => highlighter.clear("default"));

    highlighter.update();

    plans.commands = {
      Select: async (plan) => {
        const found = await classifier.find({ storeys: [plan.name] });
        highlighter.highlightByID("default", found);
      },
      Show: async (plan) => {
        const found = await classifier.find({ storeys: [plan.name] });
        hider.set(true, found);
      },
      Hide: async (plan) => {
        const found = await classifier.find({ storeys: [plan.name] });
        hider.set(false, found);
      },
    };

    plans.updatePlansList();

    const mainToolbar = new OBC.Toolbar(viewer);
    mainToolbar.name = "Main Toolbar";
    viewer.ui.addToolbar(mainToolbar);
    mainToolbar.addChild(plans.uiElement.get("main"));

    plans.onNavigated.add(() => {
      postproduction.customEffects.glossEnabled = false;
      materialManager.setBackgroundColor(whiteColor);
      materialManager.set(true, ["white"]);
      grid.visible = true;
    });

    plans.onExited.add(() => {
      postproduction.customEffects.glossEnabled = true;
      materialManager.resetBackgroundColor();
      materialManager.set(false, ["white"]);
      grid.visible = true;
    });
  };

  return (
    <div>
      <button className="flex ml-2 mt-2 gap-2" onClick={plansViews}>
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
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
        Plans
      </button>
    </div>
  );
};

export default PlantsComponent;
