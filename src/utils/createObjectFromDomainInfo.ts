import { DomainInfos } from '../types';

export function createObjectFromDomainInfo(domainInfo: string): DomainInfos {
  const initial_obj = {
    domain: '',
    admin: {
      name: '',
      email: '',
      phone: '',
    },
    tech: {
      name: '',
      email: '',
      phone: '',
    },
  };

  domainInfo.split('\n').forEach((info: string) => {
    if (info.includes('Domain Name')) {
      initial_obj.domain = info.split(':')[1].trim();
    }
    if (info.includes('Admin Name')) {
      initial_obj.admin.name = info.split(':')[1].trim();
    }
    if (info.includes('Admin Phone:')) {
      initial_obj.admin.phone = info.split(':')[1].trim();
    }
    if (info.includes('Admin Email')) {
      initial_obj.admin.email = info.split(':')[1].trim();
    }
    if (info.includes('Tech Name')) {
      initial_obj.tech.name = info.split(':')[1].trim();
    }
    if (info.includes('Tech Phone')) {
      initial_obj.tech.phone = info.split(':')[1].trim();
    }
    if (info.includes('Tech Email')) {
      initial_obj.tech.email = info.split(':')[1].trim();
    }
  });

  return {
    domain: initial_obj.domain,
    admin_name: initial_obj.admin.name,
    admin_mail: initial_obj.admin.email,
    admin_phone: initial_obj.admin.phone,
    tech_name: initial_obj.tech.name,
    tech_mail: initial_obj.tech.email,
    tech_phone: initial_obj.tech.phone,
  };
}
