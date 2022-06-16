export const template = `
  <label for="{{id}}" class="{{className}}">
    <p class="{{label.className}}">{{label.content}}</p>
    <input
      class="{{inputClassName}}"
      data-test-id="{{dataTestId}}"
      id="{{id}}"
      name="{{name}}"
      value="{{value}}"
      type="{{type}}"
      pattern="{{pattern}}"
      minLength="{{validation.minLength}}"
      maxLength="{{validation.maxLength}}"
      accept="{{accept}}"
      required="{{validation.required}}" />
  </label>
`;
