import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';

import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(cors());
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const port = Number(env('PORT', 5000));

  app.listen(port, () => console.log(`Server running on port ${port}`));
};
