import {expect} from 'chai';
import {Templator} from '.';

describe('Templator testing', () => {
  it('should correctly compile a simple template', () => {
    const template = `
    <div class="{{className}}">
      {{text}}
    </div>`;

    const expectResult = `
    <div class="my-class">
      Hello World
    </div>`;

    const context = {
      className: 'my-class',
      text: 'Hello World',
    };

    expect(new Templator(template).compile(context)).to.equal(expectResult);
  });

  it('should correctly compile a deep nested template', () => {
    const template = `
    <div class="{{className}}">
      <p>{{text}}</p>
      <div class="{{nested.className}}">
        <div>{{nested.text}}</div>
      </div>
    </div>`;

    const expectedResult = `
    <div class="class">
      <p>Text</p>
      <div class="nested-class">
        <div>Nested Text</div>
      </div>
    </div>`;

    const props = {
      className: 'class',
      nested: {
        className: 'nested-class',
        text: 'Nested Text',
      },
      text: 'Text',
    };

    expect(new Templator(template).compile(props)).to.equal(expectedResult);
  });
});
