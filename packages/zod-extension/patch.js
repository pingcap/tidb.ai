module.exports = function patch(z) {
  z.ZodType.prototype.placeholder = function placeholder(placeholder) {
    return new this.constructor({ ...this._def, placeholder });
  };

  z.ZodType.prototype.label = function label(label) {
    return new this.constructor({ ...this._def, label });
  };
}