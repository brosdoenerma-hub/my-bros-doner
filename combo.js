function comboPhoto(id){
 const p=products.find(x=>x.id===id),nuggets=id==='nugget-menu';
 const label=nuggets?'Nuggets + Pommes + Getränk':'Döner + Softgetränk';
 return `<div class="combo-photo" role="img" aria-label="${label}"><img src="assets/products/${p.image}" alt="${label}" loading="lazy"><span class="combo-label">${label}</span></div>`;
}
