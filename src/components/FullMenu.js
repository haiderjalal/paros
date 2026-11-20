import { menu, totalItems } from '@/data/menu';
import { formatAmount } from '@/lib/format';

// The complete menu, rendered on the server so every dish and price is
// visible on the page without any interaction, and indexed by search engines.
export default function FullMenu() {
  return (
    <section id="full-menu" className="full-menu" aria-labelledby="full-menu-title">
      <div className="container">
        <header className="full-head">
          <h2 id="full-menu-title" className="section-title">
            Full menu
          </h2>
          <p>{totalItems} dishes and drinks, with every size and price. All prices are in Pakistani rupees.</p>
        </header>

        <div className="full-grid">
          {menu.map((category) => (
            <article className="full-cat" key={category.id}>
              <h3>{category.name}</h3>
              {category.groups.map((group, g) => (
                <div className="full-group" key={group.title ?? `group-${g}`}>
                  {group.title && <h4>{group.title}</h4>}
                  {group.note && <p className="full-note">{group.note}</p>}
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <span className="full-name">
                          {item.name}
                          {item.note && <em>{item.note}</em>}
                        </span>
                        <Price item={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Price({ item }) {
  if (Array.isArray(item.options)) {
    return (
      <span className="full-price">
        {item.options.map((o) => (
          <span key={o.label}>
            <small>{o.label}</small> {formatAmount(o.price)}
          </span>
        ))}
      </span>
    );
  }
  if (item.price === null || item.price === undefined) {
    return <span className="full-price full-price-ask">Ask us</span>;
  }
  return <span className="full-price">{formatAmount(item.price)}</span>;
}
