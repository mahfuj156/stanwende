import { 
  useBlockProps, 
  InspectorControls 
} from '@wordpress/block-editor';

import { 
  PanelBody, 
  TextControl, 
  TextareaControl, 
  Button 
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const { heading, subtitle, cards } = attributes;

  const blockProps = useBlockProps({
    className: 'max-w-7xl mx-auto px-4 py-16'
  });

  // Update single card field
  const updateCard = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setAttributes({ cards: newCards });
  };

  // Add a new empty card
  const addCard = () => {
    setAttributes({ cards: [...cards, { title: '', description: '', url: '' }] });
  };

  // Remove card by index
  const removeCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setAttributes({ cards: newCards });
  };

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title="Content Settings" initialOpen={true}>
          <TextControl
            label="Heading"
            value={heading}
            onChange={(value) => setAttributes({ heading: value })}
          />
          <TextareaControl
            label="Subtitle"
            value={subtitle}
            onChange={(value) => setAttributes({ subtitle: value })}
          />

          <h3 className="mt-4">Cards</h3>

          {cards.map((card, index) => (
            <div key={index} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
              <TextControl
                label={`Title #${index + 1}`}
                value={card.title}
                onChange={(value) => updateCard(index, 'title', value)}
              />
              <TextareaControl
                label={`Description #${index + 1}`}
                value={card.description}
                onChange={(value) => updateCard(index, 'description', value)}
              />
              <TextControl
                label={`URL #${index + 1}`}
                value={card.url}
                onChange={(value) => updateCard(index, 'url', value)}
                placeholder="https://example.com"
              />
              <Button 
                isDestructive 
                onClick={() => removeCard(index)} 
                style={{ marginTop: '0.5rem' }}
              >
                Remove Card
              </Button>
            </div>
          ))}

          <Button isPrimary onClick={addCard}>Add Card</Button>
        </PanelBody>
      </InspectorControls>

      <section {...blockProps}>
        <h2 className="text-3xl font-bold mb-2">{heading}</h2>
        <p className="text-gray-700 mb-8">{subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#FFF7EF] rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-500 mb-3">{card.description}</p>
              <span className="inline-block text-black font-bold">›</span>
            </a>
          ))}
        </div>
      </section>
    </Fragment>
  );
}