import { Category } from './Category';
import { DataType } from './DataType';
import { License } from './License';
import { Organization } from './Organization';
import { ProviderType } from './ProviderType';

export interface Dataset {
  id: string,
  name?: string,
  title?: string,
  description?: string,
  code?: string,
  tags?: string,
  state?: number,
  visibility?: boolean,
  licenseId?: string,
  license?: License,
  organizationId?: string,
  organization?: Organization,
  dataTypeId?: string,
  dataType?: DataType,
  categoryId?: string,
  category?: Category,
  providerTypeId?: string,
  providerType?: ProviderType,
  resource?: string,
  metadata?: string,
  author?: string,
  authorEmail?: string,
  maintainer?: string,
  maintainerEmail?: string,
}