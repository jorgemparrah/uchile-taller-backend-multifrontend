import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './create-contact.dto';

export interface Contact {
  id: number;
  name: string;
  phone: string;
  category: 'family' | 'work' | 'friend';
  favorite: boolean;
}

@Injectable()
export class ContactsService {
  // Almacenamiento en memoria — los datos se pierden al reiniciar el servidor
  private contacts: Contact[] = [
    { id: 1, name: 'Ana Pérez',    phone: '+56912345678', category: 'family', favorite: true  },
    { id: 2, name: 'Carlos Soto',  phone: '+56998765432', category: 'work',   favorite: false },
    { id: 3, name: 'María López',  phone: '+56955554444', category: 'friend', favorite: true  },
  ];
  private nextId = 4;

  findAll(): Contact[] {
    return this.contacts;
  }

  create(dto: CreateContactDto): Contact {
    const contact: Contact = { id: this.nextId++, ...dto };
    this.contacts.push(contact);
    return contact;
  }
}
