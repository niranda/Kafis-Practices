import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AdminSettingsService } from '@practice/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attorney-input',
  templateUrl: './attorney-input.component.html',
  styleUrls: ['./attorney-input.component.scss']
})
export class AttorneyInputComponent implements OnInit {
  public initialAttorney: string;
  public attorney: FormGroup;

  constructor(
    private adminSettingsService: AdminSettingsService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit() {
    this.adminSettingsService.getAttorney().subscribe(attorney => {
      this.initialAttorney = attorney.value;
      this.attorney = new FormGroup({
        value: new FormControl(attorney.value)
      });
    });
  }

  public clearAttorney(): void {
    this.attorney.patchValue({ value: this.initialAttorney });
  }

  public saveAttorney(): void {
    const value = this.attorney.controls['value'].value;
    console.log(value);

    this.adminSettingsService.updateAttorney(value).subscribe(response => {
      this.toastrService.success('', this.translateService.instant('NOTIFICATIONS.UPDATE_SUCCESS'));
      this.initialAttorney = value;
    }, error => {
      this.toastrService.error(error.message || error, this.translateService.instant('NOTIFICATIONS.UPDATE_FAILED'));
    });
  }

  public get hasAttorneyChanged(): boolean {
    return this.initialAttorney !== this.attorney.controls['value'].value;
  }
}
