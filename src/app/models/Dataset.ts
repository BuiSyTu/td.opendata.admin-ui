import { Category, DataType, DatasetAPIConfig, DatasetDBConfig, DatasetFileConfig, License, Organization, ProviderType } from 'src/app/models';

export interface Dataset {
  id: string,
  name?: string,
  title?: string,
  description?: string,
  code?: string,
  tags?: string,
  approveState?: number,
  isSynced?: boolean,
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
  tableName?: string,
  datasetAPIConfig?: DatasetAPIConfig
  datasetFileConfig?: DatasetFileConfig,
  datasetDBConfig?: DatasetDBConfig
}