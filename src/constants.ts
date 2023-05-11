export const formContent = {
  customer: {
    title: 'Детали клиента',
    exp: 'customer',
    forms: [
      { title: 'Имя', name: 'name', helper_text: 'Введите имя' },
      { title: 'Email', name: 'email', helper_text: 'Введите email' },
      {
        title: 'Дней отстрочки',
        name: 'deferral_days',
        helper_text: 'Дней отсрочки должно быть больше или равно нулю',
      },
      {
        title: 'Кредитный лимит',
        name: 'credit_limit',
        helper_text: 'Кредитный лимит должен быть больше или равен нулю',
      },
    ],
  },
  org: {
    title: 'Детали организации',
    exp: 'organization',
    forms: [
      {
        title: 'Название организации',
        name: 'name',
        helper_text: 'Введите название организации',
      },
      {
        title: 'ИНН организации',
        name: 'inn',
        helper_text: 'Введите ИНН организации',
      },
      {
        title: 'КПП организации',
        name: 'kpp',
        helper_text: 'Введите КПП организации',
      },
      {
        title: 'ОГРН организации',
        name: 'ogrn',
        helper_text: 'Введите ОГРН организации',
      },
      {
        title: 'Юридический адрес',
        name: 'addr',
        helper_text: 'Введите юридический адрес',
      },
    ],
  },
  bank: {
    title: 'Банковские счета',
    exp: 'bank_accounts',
    forms: {
      main: [
        {
          title: 'Название счета',
          name: 'name',
          helper_text: 'Введите название счета',
        },
        {
          title: 'Номер счета',
          name: 'account_number',
          helper_text: 'Введите номер счета',
        },
        {
          title: 'БИК счета',
          name: 'bik',
          helper_text: 'Введите БИК счета',
        },
        {
          title: 'Корр. номер счета',
          name: 'corr_account_number',
          helper_text: 'Введите корр. номер счета',
        },
      ],
    },
  },
  emails: {
    title: 'Emails для счетов',
    exp: 'invoice_emails',
    forms: {
      main: {
        title: 'Email',
        name: 'invoice_emails',
        helper_text: 'Введите email',
      },
    },
  },
  meta: { title: 'Meta', exp: 'meta', forms: {} },
}
