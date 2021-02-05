export class customMethods {
  /** converts the mentioned array fields in an object to single field based on isPrimary field
 * @param {any} object - the object that has array as field
 * @param {any} fields - key value pair of field in object and fieldname in array.
 */
  public static reduceToPrimary(object: any, fields: any) {
    let finalObj = { ...object };
    Object.keys(fields).forEach((field) => {
      finalObj[field] = (Array.isArray(object[field]) && object[field].length > 0) ? (object[field] as any[]).find(rec => {
        return rec.isPrimary;
      })[fields[field]] : object[field];
    })
    return finalObj;
  }
  /** converts the mentioned fields in an object to array with isPrimary field
* @param {any} object - the object that has array as field
* @param {any} fields - key value pair of field in object and fieldname in array.
*/
  public static convertToArray(object, fields) {
    let finalObj = { ...object };

    Object.keys(fields).forEach((field) => {
      if (!Array.isArray(object[field])) {
        let fieldName = fields[field];
        let obj = { isPrimary: true }
        obj[fieldName] = finalObj[field];
        finalObj[field] = [obj];
      }
    })
    return finalObj;
  }
}
