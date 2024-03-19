
import { Router } from 'express';
import EventoCtrl from '../Controles/EventoCtrl.js';
const rotaEvento = new Router();
const eveCtrl = new EventoCtrl();
rotaEvento
.get('/', eveCtrl.consultar)
.get('/:termo', eveCtrl.consultar) 
.post('/', eveCtrl.gravar)
.put('/:Id', eveCtrl.atualizar)
.patch('/:Id', eveCtrl.atualizar)
.delete('/:Id', eveCtrl.excluir);

export default rotaEvento;