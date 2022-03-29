import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { produce } from 'immer';

import { Organization } from '@practice/interfaces';

@Component({
  selector: 'practice-organization-edit-dialog',
  templateUrl: './organization-edit-dialog.component.html',
  styleUrls: ['./organization-edit-dialog.component.scss']
})
export class OrganizationEditDialogComponent implements OnInit {

  private dialogWidth: number;
  private updatedOrganization: Organization;
  public organization: Organization;

  constructor(private dialogRef: MatDialogRef<OrganizationEditDialogComponent>,
              private fb: FormBuilder,
              public translate: TranslateService) { }

  public organizationFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    city: ['', [Validators.required]]
  });

  public isInvalid(id: string): boolean {
    return (this.organizationFormGroup.get(id).touched && this.organizationFormGroup.get(id).invalid);
  }

  public ngOnInit(): void {
    this.setDialogResolution();

    this.organization = this.dialogRef._containerInstance._config.data?.organization;
    if (!this.organization) { return; }
    this.organizationFormGroup.patchValue({
      name: this.organization.name,
      city: this.organization.city,
    });
  }

  public onSubmit(): void {
    if (!this.organizationFormGroup.valid) { return; }
    this.updatedOrganization = produce(this.organization, () => {
      return {
        ...this.organization,
        name: this.organizationFormGroup.get('name').value,
        city: this.organizationFormGroup.get('city').value
      };
    });
    this.dialogRef.close({ organization: this.updatedOrganization });
  }

  @HostListener('window:resize')
  public setDialogResolution(): void {
    const width = window.innerWidth;
    if (width >= 1300) {
      this.dialogWidth = width * 0.4;
    }
    else if (width < 900) {
      this.dialogWidth = width;
    } else {
      this.dialogWidth = width * 0.5;
    }

    this.dialogRef.updateSize(this.dialogWidth.toString() + 'px');
  }
}
