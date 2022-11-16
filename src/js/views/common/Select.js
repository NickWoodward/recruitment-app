import {gsap} from 'gsap';

export default class Select {
    constructor({
        select,
        modifiers = [],
        selectIcon = true,
        animations: [ animateOut, animateIn ] = []
    }) {
        //// The original select
        this.sourceSelect = select;
        this.sourceOptions = this._formatOptions(Array.from(select.querySelectorAll('option')));
        this.sourcePlaceholder = this.sourceSelect.querySelector('.placeholder')?.value;
        //// The new select
        this.customSelect = document.createElement('div');
        // Label for the selected item, not for each option
        this.customLabel = document.createElement('span'); 
        this.customOptions = document.createElement('ul');
        this.customClassModifiers = modifiers;
        this.customIcon = selectIcon;
        this.svgWrapper;

        //// Animations
        this.animateIn = animateIn;
        this.animateOut = animateOut;
  
        // Set up the custom select structure and class names
        this._init();
        this._addEventListeners();

        // Hide the source select and add the custom select after it
        this.sourceSelect.style.display = "none";

        this.sourceSelect.after(this.customSelect);
    }

    _formatOptions(optionElements) {
        return optionElements.map(option => {
            return {
                value: option.value,
                group: option.dataset.group,
                label: option.label,
                selected: option.selected,
                source: option
            }
        });
    }

    _getSelectedOption() {
        return this.sourceOptions.find(option => option.selected);
    }

    _getSelectedOptionIndex() {
        const selectedIndex = this.sourceOptions.indexOf(this._getSelectedOption());
        return selectedIndex;
    }

    _createCustomIcon(option) {
        this.svgWrapper = document.createElement('div');
        this.svgWrapper.className = 'custom-select-svg-wrapper';

        const selectedSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        selectedSvg.setAttribute("aria-hidden","true");
        selectedSvg.setAttribute('viewBox', '0 0 512 512');

        selectedSvg.setAttribute('class', 'custom-select-svg');
        selectedSvg.classList.toggle("selected", option.selected);

        path1.setAttribute('d', `M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7
        c-2.2-2.2-5.1-5.9-9.5-5.9c-4.4,0-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7
        c0,2.2,0.8,4,2,5.7l2.8,2.6c0,0,139.3,133.8,141.6,136.1c2.3,2.3,5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2L462,121.8
        c1.2-1.7,2-3.6,2-5.8C464,113.5,463,111.4,461.6,109.6z`);
        path1.setAttribute('fill', '#000000');

        selectedSvg.appendChild(path1);
        this.svgWrapper.appendChild(selectedSvg);

        // Set all icons to hidden initially
        gsap.set(this.svgWrapper, { autoAlpha: 0 })
    } 

    _selectValue(value, group) {
        console.log(this.sourceOptions);
        // Find the option in the source select
        const newSelectedOptionObject = this.sourceOptions.find((option, index) => {
            // The source options can include a placeholder, which should be skipped
            if(this.sourcePlaceholder && index === 0) return
            console.log(option, option.value, value, 'group',group, option.value === value, option.value === value && option.group === group);
            return option.value === value && option.group === group;
        });
        // console.log({value}, {newSelectedOptionObject});

        if(!newSelectedOptionObject) throw new Error('Cannot select option');

        // Placeholder is removed from label when option selected
        if(this.customLabel.classList.contains('custom-placeholder')) this.customLabel.classList.remove('custom-placeholder');

        const prevSelectedOptionObject = this._getSelectedOption();
        // TODO: Check if both of these are needed - both the source select option?
        prevSelectedOptionObject.selected = false;
        prevSelectedOptionObject.source.selected = false;

        newSelectedOptionObject.selected = true;
        newSelectedOptionObject.source.selected = true;

        console.log(newSelectedOptionObject.label);
        this.customLabel.innerText = newSelectedOptionObject.label;

        // If the selected option isn't the placeholder, remove the class from the custom select
        if(prevSelectedOptionObject.value !== this.sourcePlaceholder) {
            const prevSelector = `[data-value="${prevSelectedOptionObject.value}"]${prevSelectedOptionObject.group? `[data-group="${prevSelectedOptionObject.group}"]`:''}`;
            this.customOptions
                .querySelector(prevSelector)
                .classList
                .remove('selected');

            // Remove the selected class from the svg
            if(this.customIcon) {  
                const iconSelector = `[data-value="${prevSelectedOptionObject.value}"]${prevSelectedOptionObject.group? `[data-group="${prevSelectedOptionObject.group}"]`:""}`;
                // SVG Wrapper
                const iconWrapper = this.customOptions
                    .querySelector(iconSelector).children[0];
        
                iconWrapper.classList.remove('selected');
                gsap.set(iconWrapper, {autoAlpha: 0});
            }
        }

        // Select the new Custom Option that matches the newSelectedOptionObject values
        const newSelector = `[data-value="${newSelectedOptionObject.value}"]${newSelectedOptionObject.group? `[data-group="${newSelectedOptionObject.group}"]`:""}`
        const newCustomElement = this.customOptions.querySelector(newSelector);
          newCustomElement.classList.add("selected")
          if(this.customIcon){
            newCustomElement.children[0].classList.add('selected');
            gsap.set(newCustomElement.children[0], {autoAlpha: 1});
          }
          newCustomElement.scrollIntoView({ block: "nearest" })

    }

    _hideOptions() {
        // If it loses focus AND isn't already hidden (from other methods eg closing via clicking an option)
        if(this.customOptions.classList.contains('show')) {
            this.customOptions.classList.remove('show');
            if(this.animateOut) this.animateOut(this.customOptions);
        }
    }

    _handleClick(e) {
        const option = e.target.closest('.custom-select-option');
        const label = e.target.closest('.custom-select-value');

        if(label) {    
            this.customOptions.classList.toggle('show');
            const visible = this.customOptions.classList.contains('show');

            if(visible && this.animateIn) this.animateIn(this.customOptions);
            else if(this.animateOut) this.animateOut(this.customOptions);
        }
        if(option && option.dataset.value !== this.customPlaceholder) {
            // Select the option
            this._selectValue(option.dataset.value, option.dataset.group);

            // Then close the options
            this.customOptions.classList.remove('show');
            if(this.animateOut) this.animateOut(this.customOptions);
        }

    }

    _init() {
        // Add custom classes
        this.customSelect.classList.add('custom-select');
        this.customLabel.classList.add('custom-select-value', 'custom-placeholder');
        this.customOptions.classList.add('custom-select-options');

        this.customClassModifiers.forEach(modifier => {
            this.customSelect.classList.add(`custom-select--${modifier}`);
            this.customLabel.classList.add(`custom-select-value--${modifier}`);
            this.customOptions.classList.add(`custom-select-options--${modifier}`);
        });

        this.customSelect.tabIndex = 0;
        this.customLabel.innerText = this._getSelectedOption().label;
        this.customSelect.append(this.customLabel);

        let customGroup;

        // Create and add classes to the custom options
        this.sourceOptions.forEach((option, index) => {
            if(this.sourcePlaceholder && index === 0) return;

            const customOption = document.createElement('li');
            customOption.classList.add('custom-select-option');

            this.customClassModifiers.forEach(modifier => {
                customOption.classList.add(`custom-select-option--${modifier}`);
            });

            customOption.classList.toggle('selected', option.selected);
            
            // Set custom option value and group
            if(option.group) customOption.dataset.group = option.group;
            customOption.dataset.value = option.value;
            
            const optionTitle = document.createElement('div');
            optionTitle.classList.add('custom-select-title');
            optionTitle.innerText = option.label;
            customOption.append(optionTitle);

            // Add Icon
            if(this.customIcon) { 
                this._createCustomIcon(option);
                customOption.prepend(this.svgWrapper);
            }

            // Add Group
            if(option.group) {
                const groupElement = document.createElement('div');
                const groupLabel = document.createElement('div');

                customGroup = option.group.charAt(0).toUpperCase() + option.group.slice(1);
                groupElement.classList.add('custom-select-group');
                groupLabel.classList.add('custom-select-group-label');
                groupLabel.innerText = option.group;

                groupElement.append(groupLabel);
                this.customOptions.append(groupElement)
            }

            this.customOptions.append(customOption);

        })
        //// END OF OPTIONS ////

        this.customSelect.append(this.customOptions);

        if(this.animateIn) gsap.set(this.customOptions, { autoAlpha: 0 });
    }

    _addEventListeners() {
        // this.customSelect.addEventListener('blur', this._hideOptions.bind(this));

        this.customSelect.addEventListener('click', this._handleClick.bind(this));
    }
}