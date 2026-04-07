import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';
import { ContactsService } from './contacts.service';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @ApiOkResponse({ description: 'Retorna la lista completa de contactos' })
  findAll() {
    return this.contactsService.findAll();
  }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateContactDto })
  @ApiCreatedResponse({ description: 'Contacto creado correctamente' })
  create(@Body() dto: CreateContactDto) {
    return this.contactsService.create(dto);
  }
}
