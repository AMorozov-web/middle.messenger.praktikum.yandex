import {template} from './change-user-data.tmpl';
import {Templator} from '../../utils';

const tmpl = new Templator(template);

document.getElementById('root').innerHTML = tmpl.compile();
