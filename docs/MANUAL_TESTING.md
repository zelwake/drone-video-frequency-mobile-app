# DroneFrequency - Manual Testing Plan

This document contains complete test plans for manual testing of the application on physical devices.

## Prerequisites

- Application installed on physical Android/iOS device
- First launch completed successfully (database initialized, official bands loaded)
- Device has functional display and touchscreen

---

## Test Plan 1: First Application Launch

### Goal

Verify that the application initializes correctly on first launch.

### Steps

1. Install application on clean device (or clear application data)
2. Launch application
3. Wait for initialization to complete

### Expected Result

- ✅ Loading screen displays with text "Running migrations..."
- ✅ Followed by "Initializing database..."
- ✅ After completion, application switches to main screen
- ✅ No error messages
- ✅ Application doesn't crash

### Notes

- Initialization should take max 2-3 seconds
- Console (metro bundler) should show database seeding logs

---

## Test Plan 2: Main Guide - Basic Workflow

### Goal

Test the main application function - VTX/VRX selection and frequency entry.

### Prerequisites

- At least 1 VTX device created
- At least 1 VRX device created

### Scenario A: Exact Match (Frequency exists)

**Steps:**

1. Open application (should open on main screen - Home tab)
2. Select VTX device from dropdown
3. Select VRX device from dropdown
4. Enter frequency 5800 MHz
5. Press Enter or tap outside input

**Expected Result:**

- ✅ VTX Setting displays: Band (e.g., "F"), Band name (e.g., "FatShark"), Channel (e.g., "4")
- ✅ VRX Setting displays: Corresponding band and channel for VRX device
- ✅ Results display immediately
- ✅ "Add to Favorites" button is active

### Scenario B: Nearest Match (Frequency doesn't exist)

**Steps:**

1. Enter frequency 5803 MHz (doesn't exist in band)
2. Press Enter

**Expected Result:**

- ✅ Warning "Exact frequency not found" displays
- ✅ 2 buttons with nearest frequencies display:
  - "5800 MHz" (3 MHz lower)
  - "5805 MHz" (2 MHz higher)
- ✅ Clicking on either frequency automatically fills input and displays settings

### Scenario C: Frequency out of range

**Steps:**

1. Enter frequency 5330 MHz (very low, below most bands)
2. Press Enter

**Expected Result:**

- ✅ Warning "Exact frequency not found" displays
- ✅ Only button with higher frequency displays (e.g., "5333 MHz")
- ✅ Lower frequency doesn't display (doesn't exist)

---

## Test Plan 3: Add VTX Device

### Goal

Test creation of new VTX device with band selection.

### Steps

1. Open "Devices" tab
2. In "VTX Devices" section, click "[+ Add]"
3. Enter name: "My Whoop VTX"
4. Select type: VTX (radio button)
5. Select bands:
   - ☑ Race Band (R) → Label: "R"
   - ☑ FatShark (F) → Label: "F"
   - ☑ Boscam A → Label: "A"
6. Click "Save Device"

### Expected Result

- ✅ Form displays correctly
- ✅ All official bands (A, B, E, F, R, D, U, O, L, H) are available
- ✅ Multiple bands can be selected
- ✅ Label can be entered for each band
- ✅ After saving, device appears in VTX Devices list
- ✅ Device has correct name and displayed bands

### Edge Cases

**Test 1: Save without selected bands**

- Steps: Try to save device without selected bands
- Expected result: ✅ Validation error "At least one band must be selected"

**Test 2: Duplicate labels**

- Steps: Select 2 bands and give them same label (e.g., both "A")
- Expected result: ✅ Validation error "Labels must be unique"

---

## Test Plan 4: Create Custom Band

### Goal

Test creation of custom frequency band.

### Steps

1. In "Add Device" form, click "[+ Create Custom Band]"
2. Enter name: "My Custom Band"
3. Enter Band Sign: "X"
4. Select channel count: 4
5. Enter frequencies:
   - CH 1: 5300
   - CH 2: 5350
   - CH 3: 5400
   - CH 4: 5450
6. Click "Create"

### Expected Result

- ✅ Modal displays correctly
- ✅ Number of frequency inputs matches selected channel count (4)
- ✅ After saving, custom band appears in available bands list
- ✅ Custom band can be selected for device
- ✅ Custom band works in main guide

### Edge Cases

**Test 1: Empty frequencies**

- Steps: Try to create band with unfilled frequencies
- Expected result: ✅ Validation error "All frequencies must be filled"

---

## Test Plan 5: Edit Device

### Goal

Test editing existing device.

### Steps

1. In device list, click [⋮] (menu) on a device
2. Select "Edit"
3. Change device name
4. Add/remove some band
5. Change label of some band
6. Click "Save"

### Expected Result

- ✅ Form pre-fills with current data
- ✅ Changes save correctly
- ✅ Device updates in list
- ✅ If device is used in main guide, changes reflect immediately

---

## Test Plan 6: Delete Device

### Goal

Test device deletion.

### Steps

1. In device list, click [⋮] on a device
2. Select "Delete"
3. Confirm deletion

### Expected Result

- ✅ Confirmation dialog displays
- ✅ After confirmation, device is deleted from list
- ✅ If device was used in main guide, dropdown clears

---

## Test Plan 7: Favorite Configurations

### Goal

Test saving and using favorite configurations.

### Steps

1. In main guide, set VTX, VRX and frequency
2. Click "⭐ Add to Favorites"
3. Enter name (optional): "Race setup"
4. Save
5. Open "Settings" tab
6. In "Favorites" section, new item should appear
7. Click on item

### Expected Result

- ✅ After saving, confirmation displays
- ✅ In Settings/Favorites, new item appears
- ✅ Item contains name, VTX, VRX and frequency
- ✅ Clicking item switches to Home tab and pre-fills data
- ✅ Favorite item can be deleted

---

## Test Plan 8: Usage History

### Goal

Verify that application records search history.

### Steps

1. In main guide, perform several searches (3-5x different frequencies)
2. Open "Settings" tab
3. Check "History" section

### Expected Result

- ✅ All performed searches appear in history
- ✅ Most recent search is at top
- ✅ Each item contains VTX, VRX, frequency and timestamp
- ✅ Clicking item pre-fills data in main guide
- ✅ History contains max 10 items (older ones automatically deleted)

---

## Test Plan 9: Theme Toggle

### Goal

Test switching between light and dark mode.

### Steps

1. Open "Settings" tab
2. In "Appearance" section, select "Dark"
3. Verify entire application switches to dark mode
4. Select "Light"
5. Verify application switches to light mode
6. Select "System"
7. Change phone system settings

### Expected Result

- ✅ Switching between modes works immediately
- ✅ All screens use correct colors
- ✅ Selection saves and restores after app restart
- ✅ "System" mode respects phone system settings

---

## Test Plan 10: Spectrum Visualization (Spectrum tab)

### Goal

Test frequency chart and grid display.

### Steps

1. Open "Spectrum" tab
2. Check frequency chart
3. Check Channel Grid
4. In main guide, set some frequency
5. Return to Spectrum tab

### Expected Result

- ✅ Chart displays all frequency bands
- ✅ Each band is marked with its letter (A, B, E, F, R, D, U, O, L, H)
- ✅ Channel Grid displays grid of all channels
- ✅ Currently selected frequency is highlighted
- ✅ Can click channel in grid and set it as active

---

## Test Plan 11: Find Free Channel

### Goal

Test tool for finding free channels.

### Steps

1. Open "Find" tab
2. Click "[+ Add]" and add used frequency: 5800
3. Add another frequency: 5760
4. Add another frequency: 5880
5. Check recommended channels list

### Expected Result

- ✅ Multiple used frequencies can be added
- ✅ Recommended channels are sorted by least interference
- ✅ Distance from nearest used frequency is shown for each recommended channel
- ✅ Channels too close (< 40 MHz) are marked ⚠️
- ✅ Safe channels (> 40 MHz) are marked ✅
- ✅ Clicking recommended channel sets it in main guide

---

## Test Plan 12: Data Persistence

### Goal

Verify that data survives app restart.

### Steps

1. Create VTX and VRX devices
2. Create custom band
3. Add favorite configuration
4. Perform several searches (history)
5. Close application (force close)
6. Open application again

### Expected Result

- ✅ All created devices are still available
- ✅ Custom band exists
- ✅ Favorite configurations are preserved
- ✅ History is preserved
- ✅ Last selection in main guide is pre-filled

---

## Test Plan 13: Input Validation

### Goal

Test validation of all input fields.

### Test Cases

**Frequency in main guide:**

- Enter letters: ❌ Should only allow numbers
- Enter negative number: ❌ Should show error
- Enter 0: ❌ Should show error
- Enter very high number (10000): ⚠️ Should warn but allow

**Device name:**

- Empty name: ❌ Should show error "Name is required"
- Very long name (200 characters): ✅ Should work

**Custom Band frequencies:**

- Empty frequency: ❌ Should show error
- Invalid frequency: ❌ Should show error

---

## Test Plan 14: Performance and UX

### Goal

Test performance and user experience.

### Test Cases

**Search speed:**

- Time from entering frequency to displaying results: < 100ms
- Search doesn't react to every keystroke (debounce)

**Scroll performance:**

- Scrolling in device list: Smooth, no stuttering
- Scrolling in Channel Grid: Smooth

**Loading states:**

- Loading indicator displays when loading data
- Buttons are disabled during operations

**Error handling:**

- Understandable error message displays on error
- Application doesn't crash, can continue

---

## Release Checklist

After implementing all features, go through this checklist:

### MVP Features

- [ ] Main guide works (VTX + VRX selection + frequency)
- [ ] Nearest frequency suggestions work
- [ ] Add VTX device works
- [ ] Add VRX device works
- [ ] Edit device works
- [ ] Delete device works
- [ ] Create custom band works
- [ ] All 10 official bands are loaded

### Nice-to-have Features

- [ ] Spectrum visualization
- [ ] Find free channel
- [ ] Favorite configurations
- [ ] Usage history
- [ ] Theme toggle
- [ ] Manual/help

### Quality and Stability

- [ ] Application doesn't crash during normal use
- [ ] No memory leaks
- [ ] Speed < 100ms for searching
- [ ] All tests pass
- [ ] Lint reports no errors

### UX and Design

- [ ] Consistent design across screens
- [ ] Clear error messages
- [ ] Loading states everywhere needed
- [ ] Buttons have sufficiently large touch area (min 44x44)
- [ ] Text is readable on small and large displays

### Documentation

- [ ] README.md updated
- [ ] AGENTS.md updated
- [ ] This test plan matches current state

---

## Bug Reporting

When finding a bug, please record:

1. **Name**: Brief problem description
2. **Steps to reproduce**: Exact steps to trigger problem
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Environment**:
   - Platform (Android/iOS)
   - OS version
   - Device model
6. **Screenshot/Video**: If possible
7. **Console logs**: From Metro bundler

---

## Testing Notes

- Test on **real device**, not just emulator
- Test on **different screen sizes** (small phone, tablet)
- Test in **both orientations** (portrait and landscape)
- Test with **poor connection** (airplane mode for offline test)
- Test with **large amount of data** (10+ devices, 100+ history items)
