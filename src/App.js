import React from "react";

import {
  Gantt,
  Tasks,
  Dependencies,
  Resources,
  ResourceAssignments,
  Column,
  Editing,
  Toolbar,
  Item
} from "devextreme-react/gantt";

import { exportGantt as exportGanttToPdf } from "devextreme/pdf_exporter";

import { jsPDF } from "jspdf";
import { tasks, dependencies, resources, resourceAssignments } from "./data.js";
import ruMessages from "devextreme/localization/messages/ru.json";
import { locale, loadMessages } from "devextreme/localization";
import { font } from "./font";
import "jspdf-autotable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.formatBoxRef = null;
    this.exportModeBoxRef = null;
    this.dateRangeBoxRef = null;
    this.ganttRef = React.createRef();
    this.exportButtonOptions = {
      icon: "exportpdf",
      hint: "Export to PDF",
      stylingMode: "text",
      onClick: this.exportButtonClick.bind(this)
    };
    loadMessages(ruMessages);
    locale(navigator.language);
  }

  render() {
    return (
      <React.Fragment>
        <Gantt
          ref={this.ganttRef}
          taskListWidth={500}
          scaleType="weeks"
          height={700}
          rootValue={-1}
        >
          <Tasks dataSource={tasks} />
          <Dependencies dataSource={dependencies} />
          <Resources dataSource={resources} />
          <ResourceAssignments dataSource={resourceAssignments} />

          <Toolbar>
            <Item name="undo" />
            <Item name="redo" />
            <Item name="separator" />
            <Item name="zoomIn" />
            <Item name="zoomOut" />
            <Item name="separator" />
            <Item widget="dxButton" options={this.exportButtonOptions} />
          </Toolbar>

          <Column dataField="title" caption="Наименование" width={300} />
          <Column dataField="start" caption="Начало" />
          <Column dataField="end" caption="Окончание" />

          <Editing enabled={true} />
        </Gantt>
      </React.Fragment>
    );
  }

  exportButtonClick() {
    exportGanttToPdf({
      component: this.ganttRef.current.instance,
      landscape: true,
      format: [4100, 1700],
      dateRange: {
        startDate: new Date("2019-02-21T05:00:00.000Z"),
        endDate: new Date("2019-06-11T12:00:00.000Z")
      },
      exportMode: "all",

      createDocumentMethod: function (args) {
        const doc = new jsPDF({ format: [4100, 1700], orientation: "l" });
        doc.addFileToVFS("Inter-Regular-normal.ttf", font);
        doc.addFont("Inter-Regular-normal.ttf", "Inter-Regular", "normal");
        doc.setFont("Inter-Regular");
        return doc;
      }
    }).then((doc) => doc.save("gantt.pdf"));
  }
}

export default App;
