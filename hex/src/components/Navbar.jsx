import './Navbar.css';

export default function Navbar() {
    return (
        <nav>
            <div className="top">
                <a href="#">Logo</a>
                <ul className='links'>
                    <div>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </div>
                </ul>
            </div>
            <ul className='links small'>
                <div>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </div>
            </ul>
        </nav>
    )
}