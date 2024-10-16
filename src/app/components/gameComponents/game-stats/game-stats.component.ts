import {Component, Input} from '@angular/core';
import {PlayerStats} from "../../../interfaces/player-stats";
import {JsonPipe} from "@angular/common";
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-game-stats',
  standalone: true,
  imports: [
    JsonPipe,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './game-stats.component.html',
  styleUrl: './game-stats.component.scss'
})
export class GameStatsComponent {
  @Input() playersStats: PlayerStats[] = [];
  displayedColumns: string[] = ['email', 'correctAnswers', 'incorrectAnswers'];
}
