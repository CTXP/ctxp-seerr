import TmdbLogo from '@app/assets/services/tmdb.svg';
import TvdbLogo from '@app/assets/services/tvdb.svg';
import defineMessages from '@app/utils/defineMessages';
import React from 'react';
import { useIntl } from 'react-intl';
import Select, { type StylesConfig } from 'react-select';

enum MetadataProviderType {
  TMDB = 'tmdb',
  TVDB = 'tvdb',
}

type MetadataProviderOptionType = {
  testId?: string;
  value: MetadataProviderType;
  label: string;
  icon: React.ReactNode;
};

const messages = defineMessages('components.MetadataSelector', {
  tmdbLabel: 'The Movie Database (TMDB)',
  tvdbLabel: 'TheTVDB',
  selectMetdataProvider: 'Select a metadata provider',
});

interface MetadataSelectorProps {
  testId: string;
  value: MetadataProviderType;
  onChange: (value: MetadataProviderType) => void;
  isDisabled?: boolean;
}

const MetadataSelector = ({
  testId = 'metadata-provider-selector',
  value,
  onChange,
  isDisabled = false,
}: MetadataSelectorProps) => {
  const intl = useIntl();

  const metadataProviderOptions: MetadataProviderOptionType[] = [
    {
      testId: 'tmdb-option',
      value: MetadataProviderType.TMDB,
      label: intl.formatMessage(messages.tmdbLabel),
      icon: <TmdbLogo />,
    },
    {
      testId: 'tvdb-option',
      value: MetadataProviderType.TVDB,
      label: intl.formatMessage(messages.tvdbLabel),
      icon: <TvdbLogo />,
    },
  ];

  const customStyles: StylesConfig<MetadataProviderOptionType, false> = {
    option: (base) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
    }),
    singleValue: (base) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
    }),
  };

  const formatOptionLabel = (option: MetadataProviderOptionType) => (
    <div className="flex items-center">
      {option.icon}
      <span data-testid={option.testId}>{option.label}</span>
    </div>
  );

  return (
    <div data-testid={testId}>
      <Select
        options={metadataProviderOptions}
        isDisabled={isDisabled}
        className="react-select-container"
        classNamePrefix="react-select"
        value={metadataProviderOptions.find((option) => option.value === value)}
        onChange={(selectedOption) => {
          if (selectedOption) {
            onChange(selectedOption.value);
          }
        }}
        placeholder={intl.formatMessage(messages.selectMetdataProvider)}
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};

export { MetadataProviderType };
export default MetadataSelector;
