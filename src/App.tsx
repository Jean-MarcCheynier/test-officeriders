import React, { useState } from 'react';
import MyComponent from './Composant';


enum ActionEnum {
  BUTTON1,
  BUTTON2,
  BUTTON21
}

export interface Component {
  name: string;
  showContent: boolean;
  content: string;
  showButton: boolean;
  componentList?: Component[];
  action: ActionEnum
}

function App() {

  // Description de la liste de composants stockés dans l'état local du composant racine App.tsx 
  const initialList = [
    {
      name: "Component1",
      showContent: false,
      content: "",
      showButton: true,
      action: ActionEnum.BUTTON1
    },
    {
      name: "Component2",
      showContent: false,
      content: "",
      showButton: false,
      action: ActionEnum.BUTTON2,
      componentList: [
        {
          name: "Component2-1",
          showContent: false,
          content: "",
          showButton: false,
          action: ActionEnum.BUTTON21
        } 
      ]
    },
  ]
  

  const [componentList, setComponentList] = useState<Component[]>(initialList)


  // Dispatcher d'action ( dans une vrai application on pourrait mettre ça dans le contexte de l'app, ou utiliser redux)
  const dispatchAction = (action: ActionEnum) => {
    switch(action) {
      case ActionEnum.BUTTON1:
        // Action du bouton 1 : "Component 1: y a un bouton “B1” quand on clique dessus, le Component 2 affiche “on a cliqué sur le B1” et affiche un bouton B2"
        setComponentList(currentList => {
          if(currentList) {
            const component2 = currentList[1];
            component2.showButton = true;
            component2.content = 'on a cliqué sur le B1';
            component2.showContent = true
          }
          return [...currentList]
        })
        break;
      case ActionEnum.BUTTON2:
        // Action du bouton 2 : " quand on clique sur B2, ca affiche dans le Component 2-1 ce texte “on cliqué sur B2” et un bouton B3 "
        setComponentList(currentList => {
          if(currentList && currentList[1].componentList) {
            const component21 = currentList[1].componentList[0];
            component21.showButton = true;
            component21.content = 'on a cliqué sur le B2';
            component21.showContent = true;
          }
          return [...currentList]
        })
        break;
      case ActionEnum.BUTTON21:
        // Action du bouton 3 : "quand on clique sur ce bouton B3, ca affiche dans le Component 1 et Component 2 ce texte "on a clique sur B3”"
        setComponentList(currentList => {
          if(currentList && currentList[0]) {
            const component1 = currentList[0];
            component1.content = 'on a cliqué sur le B3';
            component1.showContent = true;
          }
          if(currentList && currentList[1]) {
            const component2 = currentList[1];
            component2.content = 'on a cliqué sur le B3';
            component2.showContent = true;
          }
          return [...currentList]
        })
        break;
      default:

    }
  }


  const renderComponentList = (componentList?: Component[]) => {
    return componentList && componentList.map((component, index) => {
      const { componentList, action, ...others} = component;
      
      return <MyComponent onButtonClicked={() => dispatchAction(action)} 
          key={index} {...others} >
          {componentList && renderComponentList(componentList) }
        </MyComponent>
    })
  }

  return (
    <div className="container">
      <h1 className="text-primary">Test Office Rider</h1>
      <p>
        Component 1: y a un bouton “B1” quand on clique dessus, le Component 2 affiche “on a cliqué sur le B1” et affiche un bouton B2 et quand on clique sur B2, ca affiche dans le Component 2-1 ce texte “on cliqué sur B2” et un bouton B3 et quand on clique sur ce bouton B3, ca affiche dans le Component 1 et Component 2 ce texte "on a clique sur B3”
      </p>
      { renderComponentList(componentList) }
    </div>
  );
}

export default App;