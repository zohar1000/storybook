import { Component } from '@angular/core';
import { mockDataGraphLines } from '@stories/mock-data/mock-data-graph-lines.const';
import { mockDataGraphPie } from '@stories/mock-data/mock-data-graph-pie.const';
import { GraphType } from '@shared/enums/graph-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  GraphType = GraphType;
  title = 'storybook';
  graphType = GraphType.LinesRegular;
  mockDataGraphLines = mockDataGraphLines;
  mockDataGraphPie = mockDataGraphPie;
}
