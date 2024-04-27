import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, inject } from "@angular/core";

export type AlertType = "success" | "info" | "warning" | "danger";

@Component({
  selector: "alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
  @Input() size: "xsmall" | "small" | "medium" | "large" | "xlarge" = "medium";
  @Input() type: AlertType = "info";
  @Input() message: string = "";
  @Input() title: string = "";
  colors!: string;

  detector = inject(ChangeDetectorRef);

  ngOnInit(): void {}
}
