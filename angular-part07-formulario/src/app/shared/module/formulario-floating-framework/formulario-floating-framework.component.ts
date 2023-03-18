import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";
import {FormValidatorService} from "../../service/form-validator.service";

@Component({
  selector: 'app-formulario-floating-framework',
  templateUrl: './formulario-floating-framework.component.html',
  styleUrls: [ '../../../../assets/css/pagina-inicial.min.css'
  ],

})
export class FormularioFloatingFrameworkComponent implements OnInit, AfterContentInit, AfterContentChecked{

  @Input() inputModel?: NgModel;
  @Input() formulario?: NgForm;
  @Input() labelName?: string;
  @Input() labelMessage?: string;

  @ViewChild('labelElement') label?: ElementRef;

  validatorIsFormSubmitted?: boolean;
  validatorIsInputDirtyOrFormSubmitted?: boolean;
  validatorNgClass?: string;


  constructor(private formValidatorService: FormValidatorService, private changeDetector: ChangeDetectorRef, private render: Renderer2, private elementRef: ElementRef) {
    this.label = this.elementRef;
    if (this.inputModel && this.formulario) {
      this.validatorNgClass = this.formValidatorService.validatorNgClass(this.inputModel, this.formulario)
      this.validatorIsFormSubmitted = this.formValidatorService.validatorisFormSubmitted(this.inputModel,this.formulario)
      this.validatorIsInputDirtyOrFormSubmitted = this.formValidatorService.validatorisInputDirtyOrFormSubmitted(this.inputModel,this.formulario)
      this.changeDetector.detectChanges();
      console.log(this.labelName)
      console.log(this.labelMessage)
    }
  }

  ngOnInit(): void {
    console.log(this.label?.nativeElement.firstElementChild)

    // if (this.labelName != null) {
    //   this.render.setAttribute(this.label, 'id', this.labelName)
    // }
  }

  ngAfterContentInit(): void {
    console.log("Chamou AfterContentInit")
    if (this.labelName != null) {
      this.render.setAttribute(this.label?.nativeElement.firstElementChild, "for", this.labelName)

    }
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges()
  }



}
