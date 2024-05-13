import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent {
  @Input() label!: string;
  @Input() width?: string;
  @Input() height?: string;
  @Output() uploaded = new EventEmitter<File>();
  file: string | undefined;
  buffer: File | undefined;
  fileEnter: boolean = false;

  handleFile(event: any) {
    let files = event.target.files;
    if (files && files[0]) {
      let blobUrl = URL.createObjectURL(files[0]);
      this.buffer = files[0];
      this.file = blobUrl;
      // Handle file upload here if needed
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.fileEnter = true;
  }

  onDragLeave() {
    this.fileEnter = false;
  }

  onDragEnd() {
    this.fileEnter = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.fileEnter = false;
    if (event.dataTransfer && event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        const item = event.dataTransfer.items[i];
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            let blobUrl = URL.createObjectURL(file);
            this.file = blobUrl;
          }
          console.log(`items file[${i}].name = ${file?.name}`);
        }
      }
    } else if (event.dataTransfer && event.dataTransfer.files) {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        const file = event.dataTransfer.files[i];
        console.log(`… file[${i}].name = ${file.name}`);
      }
    }
  }
}
