import { FormControl, Validators, ValidatorFn } from "@angular/forms";

export class GlobalValidator {

   static emailDomainValidator(control: FormControl) {
        let email = control.value;
        if (email && email.indexOf("@") != -1) { 
          let [_, domain] = email.split("@"); 
          if (domain !== "codecraft.tv") {
            return {
              'emailDomain': true
            }
          }
        }
        return null;
      }

    static getMatchValidator(valid:any) :ValidatorFn
    {
        console.log('>>'+valid.name);
        switch(valid.name)
        {
            case 'required':
                return Validators.required;
            case 'emailDomain':
                return GlobalValidator.emailDomainValidator;
            case 'requiredTrue':
              // console.log('ADDEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
                return Validators.requiredTrue;
            case 'pattern':
                return Validators.pattern(valid.pattern);
        }
      
    }
}