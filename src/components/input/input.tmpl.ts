export const template = `
  <label for={{id}} class={{className}}>
    <p class={{label.className}} >{{label.text}}</p>
    <input
      class={{inputClassName}}
      id={{id}}
      name={{name}}
      type={{type}}
      minLength={{validation.minLength}}
      maxLength={{validation.maxLength}}
      required={{validation.required}} />
  </label>
`;
