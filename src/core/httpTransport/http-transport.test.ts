import {expect} from 'chai';
import {HTTPTransport} from '.';

const httpTransport = new HTTPTransport('https://url.com');

describe('Testing of HTTPTransport interface', () => {
  it('should have a get method', () => {
    expect(httpTransport).to.have.property('get');
  });

  it('should have a post method', () => {
    expect(httpTransport).to.have.property('post');
  });

  it('should have a put method', () => {
    expect(httpTransport).to.have.property('put');
  });

  it('should have a delete method', () => {
    expect(httpTransport).to.have.property('delete');
  });
});

describe('Testing of HTTPTransport work', () => {
  it('get method should return a promise', () => {
    expect(httpTransport.get('/url')).to.be.an.instanceOf(Promise);
  });

  it('post method should return a promise', () => {
    expect(httpTransport.post('/url')).to.be.an.instanceOf(Promise);
  });

  it('put method should return a promise', () => {
    expect(httpTransport.put('/url')).to.be.an.instanceOf(Promise);
  });

  it('delete method should return a promise', () => {
    expect(httpTransport.delete('/url')).to.be.an.instanceOf(Promise);
  });
});
