class DOMHelper {
    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element);
    }

    static clearEventListeners(element) {
        const clonedElemend = element.cloneNode(true);
        element.replaceWith(clonedElemend);

        return element;
    }
}

class Tooltip{}

class ProjectItem{
    constructor(id, updateProjectListFunction){
        this.id = id;
        this.updateProjectListHandler = updateProjectListFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton();
    }

    connectSwitchButton() {

    }

    connectSwitchButton(type){
        const projectItemElement = document.getElementById(this.id);
        const switchBtn = projectItemElement.querySelector('button:last-of-type');
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
        switchBtn.addEventListener('click',  this.updateProjectListHandler.bind(null, this.id))
    }

    update(updateProjectListFunction, type) {
        this.updateProjectListHandler = updateProjectListFunction;
        this.connectSwitchButton();
    }
}

class ProjectList{
    projects = [];

    constructor(type, switchHandlerFunction) {
        this.type = type;
        
        const projectItems = document.querySelectorAll(`#${type}-projects li`)
        for (projectItem in projectItems) {
            this.projects.push(new ProjectItem(projectItem.id, this.switchProject.bind(this)));
        }
    }

    setSwitchHandler(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this));
    }

    switchProject(projectId) {        
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects = this.projects.filter(p => p.id !== projectId);
    }
}

class App{
    static init() {
        const activeProjectsList = new ProjectList("active");
        const finishedProjectsList = new ProjectList("finished");
        activeProjectsList.setSwitchHandler(finishedProjectsList.addProject.bind(finishedProjectsList));
        finishedProjectsList.setSwitchHandler(activeProjectsList.addProject.bind(activeProjectsList));
    }
}

App.init();