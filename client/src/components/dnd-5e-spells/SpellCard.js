/**
 * A descriptive card component for a single dnd 5e spell.
 * 
 * @param {*} param0 
 * @returns 
 */
export default function SpellCard({ showModal, setShowModal, content }) {
  return (
    <div>
        {JSON.stringify(content, null, 2)}
    </div>
  );
}
