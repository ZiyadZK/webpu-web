'use client'

export default function CustomModal({ 
    children,
    modalId = 'my_modal_3',
    closeButton = true,
    title = '',
    modalBoxClass = ''
}) {
    return (
        <dialog id={modalId} className="modal">
        <div className={`modal-box rounded ${modalBoxClass}`}>
            {closeButton && (
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
            )}
            {title !== '' && (
                <h3 className="font-bold text-lg">
                    {title}
                </h3>
            )}
            <hr className="my-3 " />
            {children}
        </div>
        </dialog>
    )
}