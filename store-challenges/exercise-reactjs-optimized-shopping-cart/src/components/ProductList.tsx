import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "../types/types"
import CartDisplay from "./CartDisplay";
import { FixedSizeList as List } from "react-window";

type ProductListProps = {
    products: Product[]
}

// --- Props para nuestro componente de Fila (Row) ---
type RowProps = {
    index: number;
    style: React.CSSProperties;
    data: {
        productsByRow: Product[][];
    }
}

const Row = ({ index, style, data }: RowProps) => {
    const { productsByRow } = data;
    const rowItems = productsByRow[index];

    return (
        <div className="product_row" style={style}>
            { rowItems.map((product) => {
                return <CartDisplay key={product.id} product={product}></CartDisplay>   
            })}
        </div>
    )
}

export default function ProductList({products}: ProductListProps){

    const listContainerRef = useRef<HTMLDivElement>(null);
    const [ columnCount, setColumnCount ] = useState(1);
    const [ containerHeight, setContainerHeight ] = useState(window.innerHeight);

    useEffect(() => {
        if(!listContainerRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            const containerWidth = entry.contentRect.width;
            const minItemWidth = 250; // el min width del css
            const gap = 16; // El gap del css

            const count = Math.max(1, Math.floor(containerWidth / (minItemWidth + gap)));

            setColumnCount(count);
            setContainerHeight(window.innerHeight);

        })

        observer.observe(listContainerRef.current);

        return () => observer.disconnect();

    }, [])

    const productsByRow = useMemo(() => {
        if(columnCount === 0){
            return []
        }

        const rows: Product[][] = [];

        for(let i = 0; i < products.length; i += columnCount){
            rows.push(products.slice(i, i + columnCount));
        }

        return rows;
    }, [products, columnCount])

    if(products.length === 0){
        return null;
    }

    return <div ref={listContainerRef} style={{ width: '100%', height: '100vh', marginTop: '24px'}}>
        <List 
            height={containerHeight}
            itemCount={productsByRow.length}
            itemSize={420}  // ¡MUY IMPORTANTE! La altura en píxeles de UNA fila. Debes ajustarla.
            width={'100%'}
            itemData={{ productsByRow }} // Pasamos los datos agrupados al componente Row
            >
                {Row}
        </List>
    </div>
}