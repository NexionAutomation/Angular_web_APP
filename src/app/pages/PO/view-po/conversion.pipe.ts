import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'conversion'
// })
// export class ConversionPipe implements PipeTransform {

//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }


  @Pipe({name: 'indianCurrency'})
export class IndianCurrency implements PipeTransform {
  transform(value: string, args: string[]): any {
    var output = Number(value).toLocaleString('en-IN');
        // if (! isNaN(value)) {
        //     var currencySymbol = '₹';
        //     //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
        //     var result = value.toString().split('.');

        //     var lastThree = result[0].substring(result[0].length - 3);
        //     var otherNumbers = result[0].substring(0, result[0].length - 3);
        //     if (otherNumbers != '')
        //         lastThree = ',' + lastThree;
        //     var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            
        //     if (result.length > 1) {
        //         output += "." + result[1];
        //     }            

        //     return currencySymbol + output;
        // }

        return output;
     
  }



  

}

@Pipe({ name: "replaceSubstring" })
export class ReplaceSubstring implements PipeTransform {
  transform(subject: string, substring: string, replacement: string): string {

    //notice the need to instantiate a RegExp object, since passing
    //'substring' directly will NOT work, for example
    //subject.replace(substring, replacement) and
    //subject.replace(`/${substring}/`, replacement) don't work
    //new RegExp(substring)
    subject=subject.replace(/&quot;/g, ' ');
    return subject.replace(/&nbsp;/g, ' ');
   
    //return subject.replace(substring, replacement);
  }

}
